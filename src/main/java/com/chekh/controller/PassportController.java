package com.chekh.controller;

import com.chekh.entity.PassportEntity;
import com.chekh.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/passport")
public class PassportController extends AbsController<PassportEntity> {
    private EntityRepository<PassportEntity> repository;

    @Autowired
    public PassportController(EntityRepository<PassportEntity> repository) {
        this.repository = repository;
    }

    @Override
    protected EntityRepository<PassportEntity> getRepository() {
        return repository;
    }
}
