package com.chekh.controller;

import com.chekh.entity.*;
import com.chekh.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ad")
public class AdController extends AbsController<AdEntity> {
    private EntityRepository<AdEntity> repository;

    @Autowired
    public AdController(EntityRepository<AdEntity> repository) {
        this.repository = repository;
    }

    @Override
    protected EntityRepository<AdEntity> getRepository() {
        return repository;
    }
}
