package com.akshaymarkad.photography.controller;

import com.akshaymarkad.photography.dto.PortfolioImageDto;
import com.akshaymarkad.photography.util.ApiResponse;
import com.akshaymarkad.photography.service.ImageUploadService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminUploadController {
    private final ImageUploadService uploadService;

    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Upload image (JPEG/PNG/WEBP) max 20MB")
    public ResponseEntity<ApiResponse<PortfolioImageDto>> upload(@RequestParam("file") MultipartFile file) throws IOException {
        var dto = uploadService.upload(file);
        return ResponseEntity.ok(new ApiResponse<>(true, "Uploaded", dto));
    }
}
