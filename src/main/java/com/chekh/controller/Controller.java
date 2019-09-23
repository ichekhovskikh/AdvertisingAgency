package com.chekh.controller;

import com.chekh.rest.Request;
import com.chekh.rest.Response;
import com.chekh.rest.SimpleResponse;

import java.util.List;

public interface Controller<T> {
    Response<List<T>> getAll(String sort, String search);
    Response<T> get(Long id);
    SimpleResponse add(Request<T> request);
    SimpleResponse remove(Long id);
    SimpleResponse update(Request<T> request);
}
