package com.chekh.security;

import org.springframework.security.crypto.password.PasswordEncoder;

public final class SimplePasswordEncoder implements PasswordEncoder {
    private static SimplePasswordEncoder instance;

    private SimplePasswordEncoder() {
    }

    public static synchronized PasswordEncoder getInstance() {
        if (instance == null) {
            instance = new SimplePasswordEncoder();
        }
        return instance;
    }

    @Override
    public String encode(CharSequence rawPassword) {
        return rawPassword.toString();
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return encodedPassword.equals(rawPassword.toString());
    }
}
