package com.akshaymarkad.photography.startup;

import com.akshaymarkad.photography.entity.Role;
import com.akshaymarkad.photography.entity.User;
import com.akshaymarkad.photography.repository.RoleRepository;
import com.akshaymarkad.photography.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class AdminBootstrap implements ApplicationRunner {
    private static final Logger log = LoggerFactory.getLogger(AdminBootstrap.class);
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Role adminRole = roleRepository.findByName("ADMIN").orElseGet(() -> roleRepository.save(new Role("ADMIN")));
        Role userRole = roleRepository.findByName("USER").orElseGet(() -> roleRepository.save(new Role("USER")));

        boolean adminExists = userRepository.findAll().stream().anyMatch(u -> u.getRoles() != null && u.getRoles().stream().anyMatch(r -> "ADMIN".equals(r.getName())));
        if (!adminExists) {
            String username = System.getenv().getOrDefault("ADMIN_USERNAME", "admin");
            String email = System.getenv().getOrDefault("ADMIN_EMAIL", "admin@example.com");
            String password = System.getenv().getOrDefault("ADMIN_PASSWORD", "admin");
            User admin = new User();
            admin.setUsername(username);
            admin.setEmail(email);
            admin.setPassword(passwordEncoder.encode(password));
            var roles = new HashSet<Role>();
            roles.add(adminRole);
            admin.setRoles(roles);
            userRepository.save(admin);
            log.info("Created initial admin user: {}", username);
        }
    }
}
