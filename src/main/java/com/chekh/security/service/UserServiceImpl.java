package com.chekh.security.service;

import com.chekh.dao.UserDao;
import com.chekh.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserDao dao;

    @Autowired
    public UserServiceImpl(UserDao dao) {
        this.dao = dao;
    }

    @Override
    public UserEntity getUser(String login) {
        return dao.get(login);
    }

    @Override
    public void addUser(UserEntity user) {
        dao.add(user);
    }
}
