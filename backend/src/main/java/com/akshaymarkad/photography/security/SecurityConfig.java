package com.akshaymarkad.photography.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtTokenProvider tokenProvider) throws Exception {
        JwtAuthenticationFilter jwtFilter = new JwtAuthenticationFilter(tokenProvider);
        http.csrf().disable()
                .exceptionHandling().authenticationEntryPoint(new JwtAuthenticationEntryPoint()).and()
                .authorizeHttpRequests((auth) -> auth
                    .requestMatchers("/api/auth/**", "/api/portfolio/**", "/api/services/**", "/api/contact/**").permitAll()
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .requestMatchers("/api/bookings/**").authenticated()
                    .anyRequest().permitAll()
                )
                .addFilterBefore(jwtFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public org.springframework.security.crypto.password.PasswordEncoder passwordEncoder() {
        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }

    @Bean
    public org.springframework.security.authentication.AuthenticationManager authenticationManager(org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder auth, CustomUserDetailsService uds) throws Exception {
        auth.userDetailsService(uds).passwordEncoder(passwordEncoder());
        return auth.build();
    }
}
