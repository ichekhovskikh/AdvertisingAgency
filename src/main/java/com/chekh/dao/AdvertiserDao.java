package com.chekh.dao;

import com.chekh.entity.AdvertiserEntity;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AdvertiserDao implements EntityDao<AdvertiserEntity> {

    @Override
    public List<AdvertiserEntity> getAll() {
        return HibernateHelper.inTransaction((session) -> {
            return session.createNativeQuery("SELECT * FROM advertiser", AdvertiserEntity.class).getResultList();
        });
    }

    @Override
    public AdvertiserEntity get(long id) {
        return HibernateHelper.inTransaction((session) -> {
            return session.get(AdvertiserEntity.class, id);
        });
    }

    @Override
    public void add(AdvertiserEntity advertiser) {
        HibernateHelper.inTransaction((session) -> {
            session.save(advertiser);
        });
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(AdvertiserEntity advertiser) {
        HibernateHelper.inTransaction((session) -> {
            session.remove(advertiser);
        });
    }

    @Override
    public void update(AdvertiserEntity advertiser) {
        HibernateHelper.inTransaction((session) -> {
            session.update(advertiser);
        });
    }
}
