package com.akshaymarkad.photography.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    private final Key key;
    private final long validityInMs;

    public JwtTokenProvider(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.expiration:86400000}") long validityInMs) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.validityInMs = validityInMs;
    }

    public String createToken(String username, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("roles", roles);
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMs);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        String username = claims.getSubject();
        var roles = ((List<?>) claims.get("roles", List.class));
        var authorities = roles == null ? List.of() : roles.stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r)).collect(Collectors.toList());
        return new UsernamePasswordAuthenticationToken(username, "", authorities);
    }
}
