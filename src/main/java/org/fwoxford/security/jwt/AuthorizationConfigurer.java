package org.fwoxford.security.jwt;

import io.github.jhipster.config.JHipsterProperties;
import org.fwoxford.service.EntityClient;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class AuthorizationConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    private TokenProvider tokenProvider;
    public AuthorizationConfigurer(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        AuthorizationFilter  authorizationFilter = new AuthorizationFilter(tokenProvider);
        http.addFilterBefore(authorizationFilter,JWTFilter.class);
    }
}
