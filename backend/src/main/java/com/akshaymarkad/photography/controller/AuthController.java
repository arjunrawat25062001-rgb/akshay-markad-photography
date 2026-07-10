package com.akshaymarkad.photography.controller;

import com.akshaymarkad.photography.dto.AuthRequest;
import com.akshaymarkad.photography.dto.AuthResponse;
import com.akshaymarkad.photography.dto.RefreshRequest;
import com.akshaymarkad.photography.entity.RefreshToken;
import com.akshaymarkad.photography.entity.User;
import com.akshaymarkad.photography.repository.UserRepository;
import com.akshaymarkad.photography.security.JwtTokenProvider;
import com.akshaymarkad.photography.security.UserPrincipal;
import com.akshaymarkad.photography.service.RefreshTokenService;
import com.akshaymarkad.photography.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    @Operation(summary = "Authenticate user and return access + refresh tokens")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        var principal = (UserPrincipal) authentication.getPrincipal();
        var user = userRepository.findById(principal.getId()).orElse(null);
        List<String> roles = principal.getRoles().stream().toList();
        String accessToken = tokenProvider.createToken(principal.getUsername(), roles);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        long expiresIn = Long.parseLong(System.getenv().getOrDefault("APP_JWT_EXPIRATION", "86400000"));
        log.info("User {} logged in", principal.getUsername());
        return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", new AuthResponse(accessToken, refreshToken.getToken(), expiresIn, user)));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh access token using a refresh token")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(@Valid @RequestBody RefreshRequest request) {
        RefreshToken token = refreshTokenService.findByToken(request.getRefreshToken()).orElseThrow(() -> new RuntimeException("Refresh token not found"));
        refreshTokenService.verifyExpiration(token);
        User user = token.getUser();
        List<String> roles = user.getRoles() == null ? List.of() : user.getRoles().stream().map(r -> r.getName()).toList();
        String accessToken = tokenProvider.createToken(user.getUsername(), roles);
        // rotate refresh token
        refreshTokenService.deleteByUserId(user.getId());
        RefreshToken newRefresh = refreshTokenService.createRefreshToken(user);
        return ResponseEntity.ok(new ApiResponse<>(true, "Token refreshed", new AuthResponse(accessToken, newRefresh.getToken(), Long.parseLong(System.getenv().getOrDefault("APP_JWT_EXPIRATION", "86400000")), user)));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout and invalidate refresh token")
    public ResponseEntity<ApiResponse<String>> logout(@Valid @RequestBody RefreshRequest request) {
        var tok = refreshTokenService.findByToken(request.getRefreshToken());
        tok.ifPresent(t -> refreshTokenService.deleteByUserId(t.getUser().getId()));
        return ResponseEntity.ok(new ApiResponse<>(true, "Logged out", "ok"));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<Object>> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, "Unauthenticated", null));
        }
        var principal = authentication.getPrincipal();
        if (principal instanceof UserPrincipal) {
            var up = (UserPrincipal) principal;
            var user = userRepository.findById(up.getId()).orElse(null);
            return ResponseEntity.ok(new ApiResponse<>(true, "OK", user));
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "OK", principal));
    }
}
