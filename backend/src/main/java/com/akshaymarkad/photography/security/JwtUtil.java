package com.akshaymarkad.photography.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long validity = 1000L * 60 * 60 * 24; // 24h

    public String generateToken(String subject) {
        return Jwts.builder().setSubject(subject).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + validity)).signWith(key).compact();
    }

    public Claims parse(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }
}
