package com.chekh.controller;

import com.chekh.repository.EntityRepository;
import com.chekh.rest.Request;
import com.chekh.rest.Response;
import com.chekh.rest.SimpleResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
public abstract class AbsController<T> {

    protected abstract EntityRepository<T> getRepository();

    @GetMapping("/all")
    public Response<List<T>> getAll() {
        try {
            return new Response<>(getRepository().getAll());
        } catch (Exception e) {
            return new Response<>(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }

    @GetMapping
    public Response<T> get(@RequestParam(value = "id") Long id) {
        try {
            return new Response<>(getRepository().get(id));
        } catch (Exception e) {
            return new Response<>(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }

    @PostMapping("/add")
    public SimpleResponse add(@RequestBody Request<T> request) {
        try {
            getRepository().add(request.getData());
            return new SimpleResponse(Response.Status.SUCCESS.getCode());
        } catch (Exception e) {
            return new SimpleResponse(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }

    @GetMapping("/remove")
    public SimpleResponse remove(@RequestParam(value = "id") Long id) {
        try {
            getRepository().remove(id);
            return new SimpleResponse(Response.Status.SUCCESS.getCode());
        } catch (Exception e) {
            return new SimpleResponse(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }

    @PostMapping("/update")
    public SimpleResponse update(@RequestBody Request<T> request) {
        try {
            getRepository().update(request.getData());
            return new SimpleResponse(Response.Status.SUCCESS.getCode());
        } catch (Exception e) {
            return new SimpleResponse(Response.Status.BAD_REQUEST_ERROR.getCode(), e.getMessage());
        }
    }
}
