package com.chekh.repository;

import com.chekh.dao.EntityDao;
import com.chekh.entity.ContractEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ContractRepository implements EntityRepository<ContractEntity> {
    private EntityDao<ContractEntity> dao;

    public ContractRepository(EntityDao<ContractEntity> dao) {
        this.dao = dao;
    }

    @Override
    public void close() {
        dao.close();
    }

    @Override
    public List<ContractEntity> getAll() {
        return dao.getAll();
    }

    @Override
    public ContractEntity get(long id) {
        return dao.get(id);
    }

    @Override
    public void add(ContractEntity contract) {
        dao.add(contract);
    }

    @Override
    public void remove(long id) {
        dao.remove(id);
    }

    @Override
    public void remove(ContractEntity contract) {
        dao.remove(contract);
    }

    @Override
    public void update(ContractEntity contract) {
        dao.update(contract);
    }

    @Override
    public void rollback() {
        dao.rollback();
    }
}
