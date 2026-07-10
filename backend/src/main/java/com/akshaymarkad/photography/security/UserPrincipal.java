package com.akshaymarkad.photography.security;

import com.akshaymarkad.photography.entity.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserPrincipal implements UserDetails {
    private Long id;
    private String username;
    private String password;
    private Set<String> roles;

    public static UserPrincipal create(User user) {
        UserPrincipal p = new UserPrincipal();
        p.id = user.getId();
        p.username = user.getUsername();
        p.password = user.getPassword();
        p.roles = user.getRoles() == null ? Set.of() : user.getRoles().stream().map(r -> r.getName()).collect(Collectors.toSet());
        return p;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r)).collect(Collectors.toList());
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
