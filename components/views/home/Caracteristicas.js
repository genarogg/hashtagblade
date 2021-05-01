import React from "react";
import CardCaracteristicas from "./Card/CardCaracteristicas";
import data from "../../../data/home/caracteristicas";
import Icono from "../../nano/Icono";

const Caracteristicas = () => {
  const jsx = (nombreJsx, css1, css2) => {
    const nombre = (nombre) => {
      return (
        <div className="col-xs-4">
          <h5>{nombre}</h5>
        </div>
      );
    };

    const check = (cssCheck = "icon-check") => {
      return (
        <div className="col-xs-2">
          <Icono css={cssCheck} />
        </div>
      );
    };
    return (
      <div className="row col-xs-12">
        {nombre(nombreJsx)}
        {check(css1)}
        {check(css2)}
        {check()}
      </div>
    );
  };

  return (
    <>

      <div className="col-xs-12 heading-block-home" id="caractSpace">
        <h2 className="title">Caracteristicas</h2>
      </div>

      <div className="row col-xs-12 caractSpace centerXY" >
        <CardCaracteristicas
          nombre={data().basico.title}
          numeroDeCuentas={data().basico.numeroDeCuentas}
          seguimientoHashtag={data().basico.seguimientoHashtag}
          numeroColecciones={data().basico.numeroColecciones}
          plan={data().basico.plan}
        />
        <CardCaracteristicas
          nombre={data().manager.title}
          numeroDeCuentas={data().manager.numeroDeCuentas}
          seguimientoHashtag={data().manager.seguimientoHashtag}
          numeroColecciones={data().manager.numeroColecciones}
          plan={data().manager.plan}
        />
        <CardCaracteristicas
          nombre={data().agencia.title}
          numeroDeCuentas={data().agencia.numeroDeCuentas}
          seguimientoHashtag={data().agencia.seguimientoHashtag}
          numeroColecciones={data().agencia.numeroColecciones}
          plan={data().agencia.plan}
        />
        {/* Comienzo de la tabla */}
        <div className="tabla row col-xs-12">
          <div className="border">
            <div className="row col-xs-12 titulo">
              <h5>Por tipo de cuenta</h5>
            </div>
            <div className="row col-xs-12">
              <div className="col-xs-4">
                <h5>Instagram Accounts</h5>
              </div>
              <div className="col-xs-2">1</div>
              <div className="col-xs-2">5</div>
              <div className="col-xs-2">10</div>
            </div>

            <div className="row col-xs-12">
              <div className="col-xs-4">
                <h5>Hashtag Performance Tracking</h5>
              </div>
              <div className="col-xs-2">10 posts</div>
              <div className="col-xs-2">30 posts</div>
              <div className="col-xs-2">70 posts</div>
            </div>
            <div className="row col-xs-12 titulo">
              <h5>Hashtag Data</h5>
            </div>
            {jsx("Average Likes")}
            {jsx("Average Comments")}
            {jsx("Media Count")}
            {jsx("Daily Average Post Count (DAPC)")}
            {jsx("Competition Score")}
            {jsx("Potential Reach Score")}
            <div className="row col-xs-12 titulo">
              <h5>Hashtag Performance Data</h5>
            </div>
            {jsx("Where you ranked (Posts's Analytics)")}
            {jsx("Rank Ratio", "")}
            {jsx("Average Best Rank", "")}
            {jsx("Times Ranked", "")}
            {jsx("Efficiency Score", "")}
            <div className="row col-xs-12 titulo">
              <h5>Caracteristicas</h5>
            </div>
            {jsx("Hashtag Search")}
            {jsx("Hashtag Collections")}
            {jsx("Advanced Search Filters")}
            {jsx("Account, Post & Profile Analytics")}
            {jsx("Banned Hashtag Checker")}
            {jsx("Basic Hashtag Metrics")}
            {jsx("Smart Hashtag Audit")}
            {jsx("Advanced Hashtag Metrics", "")}
            {jsx("White Label Reports", "", "")}
          </div>
        </div>
      </div>
    </>
  );
};

export default Caracteristicas;
