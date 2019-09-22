package com.chekh.dao;

import com.chekh.entity.PassportEntity;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PassportDao implements EntityDao<PassportEntity> {

    @Override
    public List<PassportEntity> getAll() {
        return HibernateHelper.inTransaction((session) -> {
            return session.createNativeQuery("SELECT * FROM passport", PassportEntity.class).getResultList();
        });
    }

    @Override
    public PassportEntity get(long id) {
        return HibernateHelper.inTransaction((session) -> {
            return session.get(PassportEntity.class, id);
        });
    }

    @Override
    public void add(PassportEntity passport) {
        HibernateHelper.inTransaction((session) -> {
            session.save(passport);
        });
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(PassportEntity passport) {
        HibernateHelper.inTransaction((session) -> {
            session.remove(passport);
        });
    }

    @Override
    public void update(PassportEntity passport) {
        HibernateHelper.inTransaction((session) -> {
            session.update(passport);
        });
    }
}
