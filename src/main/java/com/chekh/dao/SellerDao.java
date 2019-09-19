package com.chekh.dao;

import com.chekh.entity.SellerEntity;
import com.chekh.entity.PassportEntity;
import org.hibernate.Session;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SellerDao implements EntityDao<SellerEntity> {
    private Session session;

    public SellerDao(Session session) {
        this.session = session;
    }

    @Override
    public void close() {
        session.close();
    }

    @Override
    public List<SellerEntity> getAll() {
        return session.createNativeQuery("SELECT * FROM seller", SellerEntity.class).getResultList();
    }

    @Override
    public SellerEntity get(long id) {
        return session.get(SellerEntity.class, id);
    }

    @Override
    public void add(SellerEntity seller) {
        HibernateHelper.inTransaction(session, (session) -> {
            fetchReferenceColumns(seller);
            session.save(seller);
        });
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(SellerEntity seller) {
        HibernateHelper.inTransaction(session, (session) -> session.remove(seller));
    }

    @Override
    public void update(SellerEntity seller) {
        HibernateHelper.inTransaction(session, (session) -> {
            session.clear();
            fetchReferenceColumns(seller);
            session.update(seller);
        });
    }

    @Override
    public void rollback() {
        session.getTransaction().rollback();
    }

    private void fetchReferenceColumns(SellerEntity seller) {
        fetchPassport(seller);
    }

    private void fetchPassport(SellerEntity seller) {
        if (seller.getPassport() == null) {
            seller.setPassport(session.get(PassportEntity.class, seller.getPassportId()));
        }
    }
}
