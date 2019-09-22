package com.chekh.repository;

import com.chekh.dao.EntityDao;
import com.chekh.entity.AdvertiserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdvertiserRepository implements EntityRepository<AdvertiserEntity> {
    private EntityDao<AdvertiserEntity> dao;

    @Autowired
    public AdvertiserRepository(EntityDao<AdvertiserEntity> dao) {
        this.dao = dao;
    }

    @Override
    public List<AdvertiserEntity> getAll() {
        return dao.getAll();
    }

    @Override
    public AdvertiserEntity get(long id) {
        return dao.get(id);
    }

    @Override
    public void add(AdvertiserEntity advertiser) {
        dao.add(advertiser);
    }

    @Override
    public void remove(long id) {
        dao.remove(id);
    }

    @Override
    public void remove(AdvertiserEntity advertiser) {
        dao.remove(advertiser);
    }

    @Override
    public void update(AdvertiserEntity advertiser) {
        dao.update(advertiser);
    }
}
