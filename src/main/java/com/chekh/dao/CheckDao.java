package com.chekh.dao;

import com.chekh.entity.CheckEntity;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CheckDao implements EntityDao<CheckEntity> {

    @Override
    public List<CheckEntity> getAll() {
        return HibernateHelper.inTransaction((session) -> {
            return session.createNativeQuery("SELECT * FROM \"check\"", CheckEntity.class).getResultList();
        });
    }

    @Override
    public CheckEntity get(long id) {
        return HibernateHelper.inTransaction((session) -> {
            return session.get(CheckEntity.class, id);
        });
    }

    @Override
    public void add(CheckEntity check) {
        HibernateHelper.inTransaction((session) -> {
            session.save(check);
        });
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(CheckEntity check) {
        HibernateHelper.inTransaction((session) -> {
            session.remove(check);
        });
    }

    @Override
    public void update(CheckEntity check) {
        HibernateHelper.inTransaction((session) -> {
            session.update(check);
        });
    }
}
