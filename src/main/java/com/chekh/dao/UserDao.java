package com.chekh.dao;

import com.chekh.entity.UserEntity;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserDao {

    public List<UserEntity> getAll() {
        return HibernateHelper.inTransaction((session) -> {
            return session.createNativeQuery("SELECT * FROM \"user\"", UserEntity.class).getResultList();
        });
    }

    public UserEntity get(String login) {
        return HibernateHelper.inTransaction((session) -> {
            return session.get(UserEntity.class, login);
        });
    }

    public void add(UserEntity user) {
        HibernateHelper.inTransaction((session) -> {
            session.save(user);
        });
    }

    public void remove(String login) {
        remove(get(login));
    }

    public void remove(UserEntity user) {
        HibernateHelper.inTransaction((session) -> {
            session.remove(user);
        });
    }

    public void update(UserEntity user) {
        HibernateHelper.inTransaction((session) -> {
            session.update(user);
        });
    }
}
