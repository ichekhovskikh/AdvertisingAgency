package com.chekh.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "advertiser", schema = "public", catalog = "advertising_agency")
public class AdvertiserEntity {
    private Long advertiserId;
    private Long passportId;
    private String mail;
    private Long phone;
    private String checkingAccount;
    private String inn;
    private PassportEntity passport;

    @Id
    @Column(name = "advertiser_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public Long getAdvertiserId() {
        return advertiserId;
    }

    public void setAdvertiserId(Long advertiserId) {
        this.advertiserId = advertiserId;
    }

    @Basic
    @Column(name = "passport_id")
    public Long getPassportId() {
        return passportId;
    }

    public void setPassportId(Long passportId) {
        this.passportId = passportId;
    }

    @Basic
    @Column(name = "mail")
    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Basic
    @Column(name = "phone")
    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "checking_account")
    public String getCheckingAccount() {
        return checkingAccount;
    }

    public void setCheckingAccount(String checkingAccount) {
        this.checkingAccount = checkingAccount;
    }

    @Basic
    @Column(name = "inn")
    public String getInn() {
        return inn;
    }

    public void setInn(String inn) {
        this.inn = inn;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AdvertiserEntity that = (AdvertiserEntity) o;
        return Objects.equals(advertiserId, that.advertiserId) &&
                Objects.equals(passportId, that.passportId) &&
                Objects.equals(mail, that.mail) &&
                Objects.equals(checkingAccount, that.checkingAccount) &&
                Objects.equals(phone, that.phone);
    }

    @Override
    public int hashCode() {
        int result = advertiserId != null ? advertiserId.hashCode() : 0;
        result = 31 * result + (passportId != null ? passportId.hashCode() : 0);
        result = 31 * result + (mail != null ? mail.hashCode() : 0);
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        result = 31 * result + (checkingAccount != null ? checkingAccount.hashCode() : 0);
        result = 31 * result + (inn != null ? inn.hashCode() : 0);
        return result;
    }

    @ManyToOne(optional=false)
    @JoinColumn(name = "passport_id", referencedColumnName = "passport_id", insertable=false, updatable=false)
    public PassportEntity getPassport() {
        return passport;
    }

    public void setPassport(PassportEntity passport) {
        this.passport = passport;
    }
}
