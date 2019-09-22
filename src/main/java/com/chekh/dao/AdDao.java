package com.chekh.dao;

import com.chekh.entity.AdEntity;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AdDao implements EntityDao<AdEntity> {

    @Override
    public List<AdEntity> getAll() {
        return HibernateHelper.inTransaction((session) -> {
            return session.createNativeQuery("SELECT * FROM ad", AdEntity.class).getResultList();
        });
    }

    @Override
    public AdEntity get(long id) {
        return HibernateHelper.inTransaction((session) -> {
            return session.get(AdEntity.class, id);
        });
    }

    @Override
    public void add(AdEntity ad) {
        HibernateHelper.inTransaction((session) -> {
            session.save(ad);
        });
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(AdEntity ad) {
        HibernateHelper.inTransaction((session) -> {
            session.remove(ad);
        });
    }

    @Override
    public void update(AdEntity ad) {
        HibernateHelper.inTransaction((session) -> {
            session.update(ad);
        });
    }
}
