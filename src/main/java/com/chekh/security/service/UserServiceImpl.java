package com.chekh.security.service;

import com.chekh.entity.UserEntity;
import com.chekh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository repository;

    @Autowired
    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserEntity getUser(String login) {
        return repository.findById(login).orElse(null);
    }

    @Override
    public void addUser(UserEntity user) {
        repository.save(user);
    }
}
