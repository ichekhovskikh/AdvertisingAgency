package com.chekh.dao;

import com.chekh.entity.UserEntity;
import com.chekh.util.HibernateHelper;
import org.hibernate.Session;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserDao {
    private Session session;

    public UserDao(Session session) {
        this.session = session;
    }

    public void close() {
        session.close();
    }

    public List<UserEntity> getAll() {
        return session.createNativeQuery("SELECT * FROM \"user\"", UserEntity.class).getResultList();
    }

    public void add(UserEntity user) {
        HibernateHelper.inTransaction(session, (session) -> session.save(user));
    }

    public UserEntity get(String login) {
        return session.get(UserEntity.class, login);
    }

    public void remove(String login) {
        remove(get(login));
    }

    public void remove(UserEntity user) {
        HibernateHelper.inTransaction(session, (session) -> session.remove(user));
    }

    public void update(UserEntity user) {
        HibernateHelper.inTransaction(session, (session) -> {
            session.clear();
            session.update(user);
        });
    }

    public void rollback() {
        session.getTransaction().rollback();
    }
}
