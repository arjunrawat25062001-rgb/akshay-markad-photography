package com.akshaymarkad.photography.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        String cloudName = System.getenv().get("CLOUDINARY_CLOUD_NAME");
        String apiKey = System.getenv().get("CLOUDINARY_API_KEY");
        String apiSecret = System.getenv().get("CLOUDINARY_API_SECRET");
        Map<String, Object> config = ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        );
        return new Cloudinary(config);
    }
}
