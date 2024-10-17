package com.fbayhan.stock.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fbayhan.stock.config.JwtService;
import com.fbayhan.stock.dto.requestdto.AuthenticationRequest;
import com.fbayhan.stock.dto.requestdto.RegisterRequest;
import com.fbayhan.stock.dto.responsedto.AuthenticationResponse;
import com.fbayhan.stock.dto.responsedto.ResponseErrors;
import com.fbayhan.stock.enums.TokenType;
import com.fbayhan.stock.model.User;
import com.fbayhan.stock.repository.TokenRepository;
import com.fbayhan.stock.repository.UserRepository;
import com.fbayhan.stock.token.Token;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) {
        List<User> users = userRepository.getByEmail(request.getEmail());
        if (users.size() > 0) {
            List<ResponseErrors> errors = new ArrayList<>();
            ResponseErrors responseError = ResponseErrors.builder().errorDetail("Girmek istediğiniz kullanıcı sistemde bulunmaktadır").build();
            errors.add(responseError);
            return AuthenticationResponse.builder().errors(errors).build();
        }

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {


        AuthenticationResponse authenticationResponse = new AuthenticationResponse();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            System.out.println(userDetails.getUsername());
            User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);

            Map<String, Object> claims = new HashMap<>();
            List<String> permissions = new ArrayList<>();
            permissions.add("Read");
            permissions.add("Write");

            claims.put("userType", userDetails.getAuthorities());
            claims.put("username", userDetails.getUsername());
            claims.put("id", user.getId());
            claims.put("roles", permissions);
            var jwtToken = jwtService.generateToken(claims, userDetails);
            var refreshToken = jwtService.generateRefreshToken(userDetails);
            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);
            authenticationResponse = AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build();

//            var jwtToken = jwtService.generateToken(claims, users.get(0));
//            var refreshToken = jwtService.generateRefreshToken(users.get(0));

        } catch (BadCredentialsException e) {

            authenticationResponse.getErrors()
                    .add(ResponseErrors.builder().errorDetail("Check your credential").build());
        } catch (AuthenticationCredentialsNotFoundException e) {
            authenticationResponse.getErrors()
                    .add(ResponseErrors.builder().errorDetail("There is no user with email, please register").build());
        } catch (AuthenticationException e) {
            authenticationResponse.getErrors()
                    .add(ResponseErrors.builder().errorDetail("There is a error in the system").build());
        }


//        List<User> users = repository.getByEmailAndPassword(request.getEmail(), passwordEncoder.encode(request.getPassword()));
//
//        if (users.size() > 1) {
//            authenticationResponse.getErrors()
//                    .add(ResponseErrors.builder().errorDetail("There is a problem, too many users with same email, contact to administrotor").build());
//        } else if (users.size() == 1) {
//
//            Map<String, Object> claims = new HashMap<>();
//            List<String> permissions = new ArrayList<>();
//            permissions.add("Read");
//            permissions.add("Write");
//
//            claims.put("userType", users.get(0).getRole());
//            claims.put("username", users.get(0).getUsername());
//            claims.put("roles", permissions);
//            var jwtToken = jwtService.generateToken(claims, users.get(0));
//            var refreshToken = jwtService.generateRefreshToken(users.get(0));
//            revokeAllUserTokens(users.get(0));
//            saveUserToken(users.get(0), jwtToken);
//            authenticationResponse = AuthenticationResponse.builder()
//                    .accessToken(jwtToken)
//                    .refreshToken(refreshToken)
//                    .build();
//        } else {
//
//            authenticationResponse.getErrors()
//                    .add(ResponseErrors.builder().errorDetail("There is no user with email, please register").build());
//        }
        return authenticationResponse;


    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            User user = this.userRepository.findByEmail(userEmail).orElse(null);
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

}
