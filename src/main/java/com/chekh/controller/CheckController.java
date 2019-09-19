package com.chekh.controller;

import com.chekh.entity.CheckEntity;
import com.chekh.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/check")
public class CheckController extends AbsController<CheckEntity> {
    private EntityRepository<CheckEntity> repository;

    @Autowired
    public CheckController(EntityRepository<CheckEntity> repository) {
        this.repository = repository;
    }

    @Override
    protected EntityRepository<CheckEntity> getRepository() {
        return repository;
    }
}
