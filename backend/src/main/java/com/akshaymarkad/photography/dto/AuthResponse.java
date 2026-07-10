package com.akshaymarkad.photography.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private long expiresIn;
    private Object user;
}
