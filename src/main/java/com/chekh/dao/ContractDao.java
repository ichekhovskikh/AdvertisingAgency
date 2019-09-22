package com.chekh.dao;

import com.chekh.entity.*;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ContractDao implements EntityDao<ContractEntity> {

    @Override
    public List<ContractEntity> getAll() {
        return HibernateHelper.inTransaction((session) -> {
            return session.createNativeQuery("SELECT * FROM contract", ContractEntity.class).getResultList();
        });
    }

    @Override
    public ContractEntity get(long id) {
        return HibernateHelper.inTransaction((session) -> {
            return session.get(ContractEntity.class, id);
        });
    }

    @Override
    public void add(ContractEntity contract) {
        HibernateHelper.inTransaction((session) -> {
            session.save(contract);
        });
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(ContractEntity contract) {
        HibernateHelper.inTransaction((session) -> {
            session.remove(contract);
        });
    }

    @Override
    public void update(ContractEntity contract) {
        HibernateHelper.inTransaction((session) -> {
            session.update(contract);
        });
    }
}
