package com.chekh.repository;

import com.chekh.dao.EntityDao;
import com.chekh.entity.AdEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdRepository implements EntityRepository<AdEntity> {
    private EntityDao<AdEntity> dao;

    public AdRepository(EntityDao<AdEntity> dao) {
        this.dao = dao;
    }

    @Override
    public void close() {
        dao.close();
    }

    @Override
    public List<AdEntity> getAll() {
        return dao.getAll();
    }

    @Override
    public AdEntity get(long id) {
        return dao.get(id);
    }

    @Override
    public void add(AdEntity ad) {
        dao.add(ad);
    }

    @Override
    public void remove(long id) {
        dao.remove(id);
    }

    @Override
    public void remove(AdEntity ad) {
        dao.remove(ad);
    }

    @Override
    public void update(AdEntity ad) {
        dao.update(ad);
    }

    public void rollback() {
        dao.rollback();
    }
}
