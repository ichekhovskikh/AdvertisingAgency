package com.chekh.repository;

import com.chekh.dao.EntityDao;
import com.chekh.entity.PassportEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PassportRepository implements EntityRepository<PassportEntity> {
    private EntityDao<PassportEntity> dao;

    public PassportRepository(EntityDao<PassportEntity> dao) {
        this.dao = dao;
    }

    @Override
    public void close() {
        dao.close();
    }

    @Override
    public List<PassportEntity> getAll() {
        return dao.getAll();
    }

    @Override
    public PassportEntity get(long id) {
        return dao.get(id);
    }

    @Override
    public void add(PassportEntity passport) {
        dao.add(passport);
    }

    @Override
    public void remove(long id) {
        dao.remove(id);
    }

    @Override
    public void remove(PassportEntity passport) {
        dao.remove(passport);
    }

    @Override
    public void update(PassportEntity passport) {
        dao.update(passport);
    }

    @Override
    public void rollback() {
        dao.rollback();
    }
}
