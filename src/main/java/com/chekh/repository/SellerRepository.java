package com.chekh.repository;

import com.chekh.dao.EntityDao;
import com.chekh.entity.SellerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SellerRepository implements EntityRepository<SellerEntity> {
    private EntityDao<SellerEntity> dao;

    @Autowired
    public SellerRepository(EntityDao<SellerEntity> dao) {
        this.dao = dao;
    }

    @Override
    public List<SellerEntity> getAll() {
        return dao.getAll();
    }

    @Override
    public SellerEntity get(long id) {
        return dao.get(id);
    }

    @Override
    public void add(SellerEntity seller) {
        dao.add(seller);
    }

    @Override
    public void remove(long id) {
        dao.remove(id);
    }

    @Override
    public void remove(SellerEntity seller) {
        dao.remove(seller);
    }

    @Override
    public void update(SellerEntity seller) {
        dao.update(seller);
    }
}
