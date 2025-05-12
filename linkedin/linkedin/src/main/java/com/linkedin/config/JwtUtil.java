package com.linkedin.config;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;
import com.linkedin.model.User;
import com.linkedin.model.Company;
import com.linkedin.model.Admin;


import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import com.linkedin.model.User;
import com.linkedin.model.Company;
import com.linkedin.model.Admin;

@Component
public class JwtUtil {

    private static final String SECRET = "secretkey";
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    public String generateToken(Object principal) {
        String id = null;
        String role = null;

        if (principal instanceof User) {
            User u = (User) principal;
            id = u.getId();
            role = u.getRole().name();
        } else if (principal instanceof Company) {
            Company c = (Company) principal;
            id = c.getId();
            role = c.getRole().name();
        } else if (principal instanceof Admin) {
            Admin a = (Admin) principal;
            id = a.getId();
            role = a.getRole().name();
        }

        // ✅ Use mutable map instead of immutable Map.of(...)
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(id)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    public String extractUserId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractRole(String token) {
        return (String) extractAllClaims(token).get("role");
    }

    public boolean isTokenValid(String token) {
        return !extractAllClaims(token).getExpiration().before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
}
