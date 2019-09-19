package com.chekh.dao;

import com.chekh.entity.AdEntity;
import org.hibernate.Session;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AdDao implements EntityDao<AdEntity> {
    private Session session;

    public AdDao(Session session) {
        this.session = session;
    }

    @Override
    public void close() {
        session.close();
    }

    @Override
    public List<AdEntity> getAll() {
        return session.createNativeQuery("SELECT * FROM ad", AdEntity.class).getResultList();
    }

    @Override
    public AdEntity get(long id) {
        return session.get(AdEntity.class, id);
    }

    @Override
    public void add(AdEntity ad) {
        HibernateHelper.inTransaction(session, (session) -> session.save(ad));
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(AdEntity ad) {
        HibernateHelper.inTransaction(session, (session) -> session.remove(ad));
    }

    @Override
    public void update(AdEntity ad) {
        HibernateHelper.inTransaction(session, (session) -> {
            session.clear();
            session.update(ad);
        });
    }

    @Override
    public void rollback() {
        session.getTransaction().rollback();
    }
}
