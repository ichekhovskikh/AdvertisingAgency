package com.chekh.dao;

import com.chekh.entity.*;
import org.hibernate.Session;
import com.chekh.util.HibernateHelper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ContractDao implements EntityDao<ContractEntity> {
    private Session session;

    public ContractDao(Session session) {
        this.session = session;
    }

    @Override
    public void close() {
        session.close();
    }

    @Override
    public List<ContractEntity> getAll() {
        return session.createNativeQuery("SELECT * FROM contract", ContractEntity.class).getResultList();
    }

    @Override
    public ContractEntity get(long id) {
        return session.get(ContractEntity.class, id);
    }

    @Override
    public void add(ContractEntity contract) {
        HibernateHelper.inTransaction(session, (session) -> {
            fetchReferenceColumns(contract);
            session.save(contract);
        });
    }

    @Override
    public void remove(long id) {
        remove(get(id));
    }

    @Override
    public void remove(ContractEntity contract) {
        HibernateHelper.inTransaction(session, (session) -> session.remove(contract));
    }

    @Override
    public void update(ContractEntity contract) {
        HibernateHelper.inTransaction(session, (session) -> {
            session.clear();
            fetchReferenceColumns(contract);
            session.update(contract);
        });
    }

    @Override
    public void rollback() {
        session.getTransaction().rollback();
    }

    private void fetchReferenceColumns(ContractEntity contract) {
        fetchAd(contract);
        fetchAdvertiser(contract);
        fetchSeller(contract);
        fetchCheck(contract);
    }

    private void fetchAd(ContractEntity contract) {
        if (contract.getAd() == null) {
            contract.setAd(session.get(AdEntity.class, contract.getAdId()));
        }
    }

    private void fetchAdvertiser(ContractEntity contract) {
        if (contract.getAdvertiser() == null) {
            contract.setAdvertiser(session.get(AdvertiserEntity.class, contract.getAdvertiserId()));
        }
    }

    private void fetchSeller(ContractEntity contract) {
        if (contract.getSeller() == null) {
            contract.setSeller(session.get(SellerEntity.class, contract.getSellerId()));
        }
    }

    private void fetchCheck(ContractEntity contract) {
        if (contract.getCheck() == null) {
            contract.setCheck(session.get(CheckEntity.class, contract.getCheckId()));
        }
    }
}
