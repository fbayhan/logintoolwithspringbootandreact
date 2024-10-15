package com.fbayhan.stock.dto.responsedto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResponseErrors {
    private String errorDetail;
}
