package com.chekh.controller;

import com.chekh.entity.SellerEntity;
import com.chekh.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/seller")
public class SellerController extends AbsController<SellerEntity> {
    private EntityRepository<SellerEntity> repository;

    @Autowired
    public SellerController(EntityRepository<SellerEntity> repository) {
        this.repository = repository;
    }

    @Override
    protected EntityRepository<SellerEntity> getRepository() {
        return repository;
    }
}
