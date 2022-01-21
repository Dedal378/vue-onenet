import { formattedDate } from '@/services/utils/';
import leadsStatuses from '@/data/leadsStatuses';
import defaultTransactions from '@/data/defaultTransactions';
import priorityList from '@/data/priorityList';

export const formattedLeadsInfo = ({
  APL,
  EPL,
  incomingToday,
  incomingTotal,
  today,
  total,
  percentageOfRealizedLeads,
}) => {
  const statsArray = [
    {
      title: 'Заработано сегодня',
      value: `${incomingToday} &#8381;`,
    },
    {
      title: 'Сегодня лидов',
      value: today,
    },
    {
      title: 'Процент реализованных лидов',
      value: percentageOfRealizedLeads.toFixed(2),
    },
    {
      title: 'APL',
      value: APL.toFixed(2),
    },
    {
      title: 'EPL',
      value: EPL.toFixed(2),
    },
    {
      title: 'Заработано всего',
      value: `${incomingTotal} &#8381;`,
    },
    {
      title: 'Всего лидов',
      value: total,
    },
  ];

  return statsArray;
};

export const formattedChartData = (data) => {
  const getDataItemsByStatus = (label, status) => {
    const dataItem = data[label][status];
    return dataItem;
  };

  const dataKeys = Object.keys(data).sort();

  const inWorking = dataKeys.map((item) => getDataItemsByStatus(item, 300));
  const sold = dataKeys.map((item) => getDataItemsByStatus(item, 400));
  const notSold = dataKeys.map((item) => getDataItemsByStatus(item, 500));

  const labels = dataKeys.map((item) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const date = new Intl.DateTimeFormat('ru', options).format(new Date(item));
    return date;
  });

  const formattedObject = {
    labels,
    datasets: [
      {
        data: inWorking,
        borderColor: '#008ffb',
        backgroundColor: '#008ffb',
        status: 'В работе',
      },
      {
        data: sold,
        borderColor: '#00e396',
        backgroundColor: '#00e396',
        status: 'Продан',
      },
      {
        data: notSold,
        borderColor: '#feb019',
        backgroundColor: '#feb019',
        status: 'Не продан',
      },
    ],
  };
  return formattedObject;
};

export const formattedDiagramData = (data) => {
  const formattedObject = {
    labels: data.name,
    datasets: [
      {
        data: data.value,
        backgroundColor: ['#008ffb', '#00e396', '#feb019'],
      },
    ],
  };
  return formattedObject;
};

export const formattedLeadsTableData = (data, regions) => {
  const formattedData = [];

  data.forEach((lead) => {
    const [currentRegion] = regions.filter(
      (region) => region.id === lead.region_id,
    );
    const [currentStatus] = leadsStatuses.filter(
      (status) => status.value === lead.statusGroup,
    );
    const tags = lead.tags.map(({ tag }) => tag.name);
    const price = lead.clone_lead_data?.w_price || lead.w_price;

    const leadObject = {
      id: lead.id,
      phone: lead.phone,
      tags,
      status: currentStatus ? currentStatus.label : '',
      region: currentRegion ? currentRegion.name : '',
      dateCreated: formattedDate(lead.created_at),
      price: price ? `${price.toFixed(2)} руб` : 'Нет данных',
      mode: currentStatus.mode || '_working',
    };

    formattedData.push(leadObject);
  });

  return formattedData;
};

export const formattedPromoData = (promos) => {
  const formattedPromos = [];
  const activePromoObject = {};
  const deletedPromoObject = {};

  const activePromos = promos.filter((promo) => promo.status === 0);
  const deletedPromos = promos.filter((promo) => promo.status === 1);

  activePromoObject.label = 'Активные';
  activePromoObject.promos = activePromos;

  deletedPromoObject.label = 'Удалённые';
  deletedPromoObject.promos = deletedPromos;

  if (activePromos.length) {
    formattedPromos.push(activePromoObject);
  }

  if (deletedPromos.length) {
    formattedPromos.push(deletedPromoObject);
  }

  return formattedPromos;
};

export const formattedReportFreeInformation = ({ name, value }) => {
  const reportInforamtionList = [];

  name.forEach((item, index) => {
    const infoItem = {};
    infoItem.name = item;
    infoItem.value = `${value[index]} шт.`;

    reportInforamtionList.push(infoItem);
  });

  return reportInforamtionList;
};

export const formattedReportStatistic = ({
  sold,
  sold_count,
  APL,
  EPL,
  count,
}) => {
  const averageSum = sold && sold_count ? sold / sold_count : 0;
  const realizeLeadsPercent =
    sold_count && count ? (sold_count / count) * 100 : 0;

  const reportStatisticList = [
    {
      name: 'Общая сумма проданных лидов',
      value: `${sold.toFixed(2)} руб`,
    },
    {
      name: 'Общее кол-во проданных лидов',
      value: `${sold_count} шт`,
    },
    {
      name: 'Средняя цена продажи',
      value: `${averageSum.toFixed(2)} руб`,
    },
    {
      name: 'Реализованные лиды %',
      value: `${realizeLeadsPercent.toFixed(2)} %`,
    },
    {
      name: 'APL',
      value: `${APL.toFixed(2)} руб`,
    },
    {
      name: 'EPL',
      value: `${EPL.toFixed(2)} руб`,
    },
  ];

  return reportStatisticList;
};

export const formattedReportTableData = (data) => {
  const formattedData = [];

  data.forEach((item) => {
    const percent = item.conversion
      ? `${item.conversion.toFixed(2)} %`
      : '0.00 %';
    const epl = item.epl ? `${item.epl.toFixed(2)} руб` : '0.00 руб';
    const apl = item.apl ? `${item.apl.toFixed(2)} руб` : '0.00 руб';
    const cr = item.cr ? `${item.cr.toFixed(2)} %` : '0.00 %';
    const earned = item.sold ? `${item.sold.toFixed(2)} руб` : '0.00 руб';
    const duplicate = `${item.duplicates} шт`;
    const notRegion = `${item.notRegion} шт`;

    const leadObject = {
      promo: item.name,
      views: item.views || 0,
      addedLeads: `${item.totalCount || 0} шт`,
      soldLeads: `${item.totalSuccess || 0} шт`,
      inWork: `${item.inWork || 0} шт`,
      percent,
      defect: `${item.defect || 0} шт`,
      epl,
      apl,
      cr,
      earned,
      duplicate,
      notRegion,
    };

    formattedData.push(leadObject);
  });

  return formattedData;
};

export const formattedReportTableSummary = (summaryData) => {
  const percent = summaryData.conversion
    ? `${summaryData.conversion.toFixed(2)} %`
    : '0.00 %';
  const epl = summaryData.epl
    ? `${summaryData.epl.toFixed(2)} руб`
    : '0.00 руб';
  const apl = summaryData.apl
    ? `${summaryData.apl.toFixed(2)} руб`
    : '0.00 руб';
  const cr = summaryData.cr ? `${summaryData.cr.toFixed(2)} %` : '0.00 %';
  const earned = summaryData.sold
    ? `${summaryData.sold.toFixed(2)} руб`
    : '0.00 руб';
  const duplicate = `${summaryData.duplicates} шт`;
  const notRegion = `${summaryData.notRegion} шт`;

  const summaryObject = {
    views: summaryData.totalViews || 0,
    addedLeads: `${summaryData.totalCount || 0} шт`,
    soldLeads: `${summaryData.totalSuccess || 0} шт`,
    inWork: `${summaryData.inWork || 0} шт`,
    percent,
    defect: `${summaryData.defect || 0} шт`,
    epl,
    apl,
    cr,
    earned,
    duplicate,
    notRegion,
  };

  return summaryObject;
};

export const formattedLeadData = (lead) => {
  let sourceItem = {};
  let soldDateItem = {};
  let reasonItem = {};
  let price = {};
  let freezePrice = {};
  const [currentStatus] = leadsStatuses.filter(
    (status) => status.value === lead.statusGroup,
  );
  const {
    region,
    promo,
    source,
    lead_source_created,
    status_id,
    sold_date,
    created_at,
    reason_from_table,
    reason,
    clone_lead_data,
    w_price,
  } = lead;

  const isShowFreezePrice = (soldDate) => {
    const hoursInDay = 24;
    const diff = new Date() - new Date(soldDate).getTime();
    const hours = Math.floor(diff / 3600 / 1000);

    return hours < hoursInDay;
  };

  const infoList = [
    {
      name: 'Статус',
      value: currentStatus.label,
      mode: `${currentStatus.mode} _status`,
      sort: 1,
    },
    {
      name: 'Телефон',
      value: lead.phone || '',
      sort: 2,
    },
    {
      name: 'Имя',
      value: lead.name || '',
      sort: 3,
    },
    {
      name: 'Дата создания',
      value: formattedDate(created_at),
      sort: 5,
    },
    {
      name: 'Промо',
      value: `${promo.promo?.name} - ${promo.name}`,
      sort: 9,
    },
  ];

  if (source) {
    sourceItem = {
      name: 'Источник',
      value: source,
      mode: '_link',
      sort: 10,
    };

    infoList.push(source);
  } else if (region) {
    const regionInfo = {
      name: 'Регион',
      value: region?.name || '',
      sort: 4,
    };

    infoList.push(regionInfo);
  } else if (lead_source_created) {
    sourceItem = {
      name: 'Источник',
      value: lead_source_created.source,
      mode: '_link',
      sort: 10,
    };

    infoList.push(sourceItem);
  }

  if (currentStatus.value === 400 && status_id !== 3) {
    soldDateItem = {
      name: 'Дата продажи',
      value: formattedDate(sold_date),
      sort: 6,
    };

    price = {
      name: 'Цена',
      value: w_price || 'Нет данных',
      sort: 7,
    };

    freezePrice = {
      name: 'Замороженная сумма',
      value: w_price || 'Нет данных',
      sort: 8,
    };

    if (isShowFreezePrice(sold_date)) {
      infoList.push(soldDateItem, price, freezePrice);
    } else {
      infoList.push(soldDateItem, price);
    }
  }

  if (currentStatus.value === 400 && status_id === 3) {
    soldDateItem = {
      name: 'Дата продажи',
      value: formattedDate(clone_lead_data.sold_date),
      sort: 6,
    };

    price = {
      name: 'Цена',
      value: clone_lead_data.w_price || 'Нет данных',
      sort: 7,
    };

    freezePrice = {
      name: 'Замороженная сумма',
      value: clone_lead_data.w_price || 'Нет данных',
      sort: 8,
    };

    if (isShowFreezePrice(clone_lead_data.sold_date)) {
      infoList.push(soldDateItem, price, freezePrice);
    } else {
      infoList.push(soldDateItem, price);
    }
  }

  if (currentStatus.value === 500 && status_id !== 8) {
    reasonItem = {
      name: 'Причина брака',
      value: reason_from_table.name,
    };
    infoList.push(reasonItem);
  } else if (currentStatus.value === 500 && status_id === 8) {
    reasonItem = {
      name: 'Причина брака',
      value: `Не регион: ${reason}`,
    };
    infoList.push(reasonItem);
  }

  return infoList.sort((prev, next) => prev.sort - next.sort);
};

export const formattedReportChartData = (data) => {
  const labels = data.map((item) => item.name);
  const bar = data.map((item) => item.price);
  const line = data.map((item) => item.total);

  return {
    labels,
    bar,
    line,
  };
};

export const formattedMenuInfo = ({
  name,
  id,
  balance,
  is_active,
  rating_id,
}) => {
  return {
    name,
    id: id || 0,
    balance: balance.toLocaleString('ru') || 0,
    is_active,
    rating_id,
  };
};

export const formattedABTestTableData = (data) => {
  const formattedData = [];

  data.forEach((item) => {
    const percent = item.conversion
      ? `${item.conversion.toFixed(2)} %`
      : '0.00 %';
    const cr =
      item.total_count > 0 && item.views > 0
        ? `${(item.total_count / item.views).toFixed(2)} %`
        : '0.00 %';
    const sold = item.sold ? `${item.sold.toFixed(2)} руб` : '0.00 руб';

    const leadObject = {
      name: item.name,
      views: item.views || 0,
      addedLeads: `${item.total_count || 0} шт`,
      soldLeads: `${item.total_success || 0} шт`,
      cr,
      percent,
      sold,
    };

    formattedData.push(leadObject);
  });

  return formattedData;
};

export const formattedABTestStatistic = ({
  apl,
  conversion,
  epl,
  sold,
  total_count,
  total_success,
  total_views,
}) => {
  const data = [
    {
      name: 'Кол-во показов',
      value: total_views,
    },
    {
      name: 'Кол-во добавленных лидов',
      value: total_count,
    },
    {
      name: 'Кол-во проданных лидов',
      value: total_success,
    },
    {
      name: '% одобрения',
      value: `${conversion.toFixed(2)} %`,
    },
    {
      name: 'Заработано',
      value: sold.toFixed(2),
    },
    {
      name: 'APL',
      value: apl.toFixed(2),
    },
    {
      name: 'EPL',
      value: epl.toFixed(2),
    },
  ];

  return data;
};

export const formattedABReportTableSummary = (summaryData) => {
  const percent = summaryData.conversion
    ? `${summaryData.conversion.toFixed(2)} %`
    : '0.00 %';
  const cr =
    summaryData.total_count > 0 && summaryData.total_views > 0
      ? `${(summaryData.total_count / summaryData.total_views).toFixed(2)} %`
      : '0.00 %';
  const sold = summaryData.sold
    ? `${summaryData.sold.toFixed(2)} руб`
    : '0.00 руб';

  const summaryObject = {
    name: '',
    views: summaryData.total_views || 0,
    addedLeads: `${summaryData.total_count || 0} шт`,
    soldLeads: `${summaryData.total_success || 0} шт`,
    cr,
    percent,
    sold,
  };

  return summaryObject;
};

export const formattedTicketsTable = (data) => {
  const formattedData = [];

  data.forEach(
    ({
      id,
      title,
      status_name,
      created_at,
      type_name,
      important,
      w_user_viewed,
    }) => {
      const [priority] = priorityList.filter((p) => p.id === important);

      const date = formattedDate(created_at);
      const ticketObject = {
        id,
        question: title,
        status: status_name,
        priority: priority.name,
        category: type_name,
        date,
        w_user_viewed,
      };

      formattedData.push(ticketObject);
    },
  );

  return formattedData;
};

export const formattedBalanceTableData = (data) => {
  const formattedData = [];

  data.forEach((item) => {
    let type, mode;
    let tooltipContent = '';
    let linkType = '';

    const type_id = item.type_id;
    const transaction = item.id;
    const sum = item.sum;
    const date = formattedDate(item.created_at);
    const who_id = item.who_id;

    if (type_id === 299 && item.withdrawal_incoming) {
      const tooltipDate = formattedDate(
        item.withdrawal_incoming.updated_at,
        false,
      );
      type = item.withdrawal_incoming.status.name;
      mode = 'negative';

      if (item.withdrawal_incoming.status.id === 1) {
        tooltipContent = `Передача заявок на исполнение происходит ежедневно 
        в первой половине дня за предыдущие сутки. ${tooltipDate}`;
      }

      if (item.withdrawal_incoming.status.id === 2) {
        tooltipContent = `Получен документ об успешном исполнении заявки. ${tooltipDate}`;
      }

      if (item.withdrawal_incoming.status.id === 3) {
        tooltipContent = `Заявка на вывод одобрена и передана в отдел выплат для исполнения, 
        ориентировочное время исполнения 1-3 рабочих дня. ${tooltipDate}`;
      }

      if (item.withdrawal_incoming.status.id === 4) {
        tooltipContent = `Во время исполнения заявки возникли ошибки, 
        подробную информацию уточняйте у своего личного менеджера. ${tooltipDate}`;
      }
    } else if (type_id === 299 && !item.withdrawal_incoming) {
      type = item.name;
      mode = 'negative';
    } else if (type_id === 121 && item.withdrawal_outgoing) {
      type = item.name;
      mode = 'positive';
      tooltipContent = `Возврат вывода # ${item.withdrawal_outgoing.incoming_balance?.id}`;
    } else if (type_id === 121 && !item.withdrawal_outgoing) {
      type = item.name;
      mode = 'positive';
    } else {
      const [defaultTransaction] = defaultTransactions.filter(
        (t) => t.id === item.type_id,
      );
      type = defaultTransaction.name;
      mode = defaultTransaction.mode;
      linkType = defaultTransaction.linkType;
    }
    const leadObject = {
      transaction,
      sum,
      type,
      date,
      mode,
      tooltipContent,
      linkType,
      who_id,
    };

    formattedData.push(leadObject);
  });

  return formattedData;
};

export const formattedTicketInfo = (data) => {
  const [priority] = priorityList.filter((item) => item.id === data.important);

  const formattedInfo = [
    {
      type: 'status',
      name: 'Статус',
      value: data.status_name,
    },
    {
      type: 'important',
      name: 'Степень важности',
      value: priority.name,
    },
    {
      type: 'date',
      name: 'Дата создания',
      value: formattedDate(data.created_at),
    },
    {
      type: 'category',
      name: 'Категория',
      value: data.type_name,
    },
    {
      type: 'messages_count',
      name: 'Всего сообщений',
      value: data.replies.length,
    },
    {
      type: 'manager',
      name: 'Менеджер',
      value: data.staff?.name || '',
    },
    {
      type: 'actions',
      name: 'Действия',
      btnText: data.status_id === 1 ? 'Закрыть' : 'Открыть',
      statusId: data.status_id,
    },
    {
      type: 'regard',
      name: !data.regard ? 'Оценить работу' : 'Оценка',
      value: !!data.regard ? data.regard : null,
    },
  ];

  return formattedInfo;
};
