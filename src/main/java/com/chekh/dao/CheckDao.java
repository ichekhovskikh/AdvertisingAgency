package com.chekh.dao;

import com.chekh.entity.CheckEntity;
import org.hibernate.Session;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CheckDao implements EntityDao<CheckEntity> {
    private Session session;

    public CheckDao(Session session) {
        this.session = session;
    }

    @Override
    public void close() {
        session.close();
    }

    @Override
    public List<CheckEntity> getAll() {
        return session.createNativeQuery("SELECT * FROM \"check\"", CheckEntity.class).getResultList();
    }

    @Override
    public CheckEntity get(long id) {
        return session.get(CheckEntity.class, id);
    }

    @Override
    public void add(CheckEntity check) {
        HibernateHelper.inTransaction(session, (session) -> session.save(check));
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(CheckEntity check) {
        HibernateHelper.inTransaction(session, (session) -> session.remove(check));
    }

    @Override
    public void update(CheckEntity check) {
        HibernateHelper.inTransaction(session, (session) -> {
            session.clear();
            session.update(check);
        });
    }

    @Override
    public void rollback() {
        session.getTransaction().rollback();
    }
}
