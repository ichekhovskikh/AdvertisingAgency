package com.chekh.dao;

import com.chekh.entity.SellerEntity;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SellerDao implements EntityDao<SellerEntity> {

    @Override
    public List<SellerEntity> getAll() {
        return HibernateHelper.inTransaction((session) -> {
            return session.createNativeQuery("SELECT * FROM seller", SellerEntity.class).getResultList();
        });
    }

    @Override
    public SellerEntity get(long id) {
        return HibernateHelper.inTransaction((session) -> {
            return session.get(SellerEntity.class, id);
        });
    }

    @Override
    public void add(SellerEntity seller) {
        HibernateHelper.inTransaction((session) -> {
            session.save(seller);
        });
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(SellerEntity seller) {
        HibernateHelper.inTransaction((session) -> {
            session.remove(seller);
        });
    }

    @Override
    public void update(SellerEntity seller) {
        HibernateHelper.inTransaction((session) -> {
            session.update(seller);
        });
    }
}
