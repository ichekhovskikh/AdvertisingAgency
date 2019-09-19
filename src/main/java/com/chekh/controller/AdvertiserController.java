package com.chekh.controller;

import com.chekh.entity.AdvertiserEntity;
import com.chekh.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/advertiser")
public class AdvertiserController extends AbsController<AdvertiserEntity> {
    private EntityRepository<AdvertiserEntity> repository;

    @Autowired
    public AdvertiserController(EntityRepository<AdvertiserEntity> repository) {
        this.repository = repository;
    }

    @Override
    protected EntityRepository<AdvertiserEntity> getRepository() {
        return repository;
    }
}
