package com.chekh.security.service;

import com.chekh.entity.UserEntity;

public interface UserService {
    UserEntity getUser(String login);
    void addUser(UserEntity user);
}
