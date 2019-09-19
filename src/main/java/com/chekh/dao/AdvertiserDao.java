package com.chekh.dao;

import com.chekh.entity.AdvertiserEntity;
import com.chekh.entity.PassportEntity;
import org.hibernate.Session;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AdvertiserDao implements EntityDao<AdvertiserEntity> {
    private Session session;

    public AdvertiserDao(Session session) {
        this.session = session;
    }

    @Override
    public void close() {
        session.close();
    }

    @Override
    public List<AdvertiserEntity> getAll() {
        return session.createNativeQuery("SELECT * FROM advertiser", AdvertiserEntity.class).getResultList();
    }

    @Override
    public AdvertiserEntity get(long id) {
        return session.get(AdvertiserEntity.class, id);
    }

    @Override
    public void add(AdvertiserEntity advertiser) {
        HibernateHelper.inTransaction(session, (session) -> {
            fetchReferenceColumns(advertiser);
            session.save(advertiser);
        });
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(AdvertiserEntity advertiser) {
        HibernateHelper.inTransaction(session, (session) -> session.remove(advertiser));
    }

    @Override
    public void update(AdvertiserEntity advertiser) {
        HibernateHelper.inTransaction(session, (session) -> {
            session.clear();
            fetchReferenceColumns(advertiser);
            session.update(advertiser);
        });
    }

    @Override
    public void rollback() {
        session.getTransaction().rollback();
    }

    private void fetchReferenceColumns(AdvertiserEntity advertiser) {
        fetchPassport(advertiser);
    }

    private void fetchPassport(AdvertiserEntity advertiser) {
        if (advertiser.getPassport() == null) {
            advertiser.setPassport(session.get(PassportEntity.class, advertiser.getPassportId()));
        }
    }
}
