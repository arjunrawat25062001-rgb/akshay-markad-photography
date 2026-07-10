package com.akshaymarkad.photography.service;

import com.akshaymarkad.photography.dto.PortfolioImageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageUploadService {
    private final CloudinaryService cloudinaryService;

    private static final long MAX_BYTES = 20L * 1024 * 1024; // 20 MB

    public PortfolioImageDto upload(MultipartFile file) throws IOException {
        if (file.getSize() > MAX_BYTES) throw new IllegalArgumentException("File too large");
        String contentType = file.getContentType();
        if (contentType == null || !(contentType.equals("image/jpeg") || contentType.equals("image/png") || contentType.equals("image/webp"))) {
            throw new IllegalArgumentException("Invalid file type");
        }
        Map result = cloudinaryService.upload(file, null);
        PortfolioImageDto dto = new PortfolioImageDto();
        dto.setUrl((String) result.get("secure_url"));
        dto.setPublicId((String) result.get("public_id"));
        Object w = result.get("width");
        Object h = result.get("height");
        dto.setWidth(w == null ? null : ((Number) w).intValue());
        dto.setHeight(h == null ? null : ((Number) h).intValue());
        return dto;
    }
}
