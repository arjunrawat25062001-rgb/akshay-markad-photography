package com.akshaymarkad.photography;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class PhotographyApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhotographyApplication.class, args);
    }

    @Bean
    public AuditorAware<String> auditorProvider() {
        return () -> Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication() != null ? SecurityContextHolder.getContext().getAuthentication().getName() : "system");
    }
}
