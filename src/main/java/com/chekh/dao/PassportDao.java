package com.chekh.dao;

import com.chekh.entity.PassportEntity;
import org.hibernate.Session;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PassportDao implements EntityDao<PassportEntity> {
    private Session session;

    public PassportDao(Session session) {
        this.session = session;
    }

    @Override
    public void close() {
        session.close();
    }

    @Override
    public List<PassportEntity> getAll() {
        return session.createNativeQuery("SELECT * FROM passport", PassportEntity.class).getResultList();
    }

    @Override
    public PassportEntity get(long id) {
        return session.get(PassportEntity.class, id);
    }

    @Override
    public void add(PassportEntity passport) {
        HibernateHelper.inTransaction(session, (session) -> session.save(passport));
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(PassportEntity passport) {
        HibernateHelper.inTransaction(session, (session) -> session.remove(passport));
    }

    @Override
    public void update(PassportEntity passport) {
        HibernateHelper.inTransaction(session, (session) -> {
            session.clear();
            session.update(passport);
        });
    }

    @Override
    public void rollback() {
        session.getTransaction().rollback();
    }
}
