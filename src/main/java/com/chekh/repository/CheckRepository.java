package com.chekh.repository;

import com.chekh.dao.EntityDao;
import com.chekh.entity.CheckEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CheckRepository implements EntityRepository<CheckEntity> {
    private EntityDao<CheckEntity> dao;

    public CheckRepository(EntityDao<CheckEntity> dao) {
        this.dao = dao;
    }

    @Override
    public void close() {
        dao.close();
    }

    @Override
    public List<CheckEntity> getAll() {
        return dao.getAll();
    }

    @Override
    public CheckEntity get(long id) {
        return dao.get(id);
    }

    @Override
    public void add(CheckEntity check) {
        dao.add(check);
    }

    @Override
    public void remove(long id) {
        dao.remove(id);
    }

    @Override
    public void remove(CheckEntity check) {
        dao.remove(check);
    }

    @Override
    public void update(CheckEntity check) {
        dao.update(check);
    }

    @Override
    public void rollback() {
        dao.rollback();
    }
}
