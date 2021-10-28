async function loadMonths(axios) {
  const resp = await axios("/history?country=Brazil&status=deaths");
  const dataAPI = resp.data;

  const datesAPI = dataAPI["All"].dates;

  const datesKeys = Object.keys(datesAPI);

  let dates = [];
  datesKeys.forEach((dateKey) => {
    let date = {
      date: new Date(dateKey.toString()),
      quantity: datesAPI[dateKey],
    };

    dates.push(date);
  });

  let yearMonths = [],
    jan = [],
    feb = [],
    mar = [],
    apr = [],
    may = [],
    jun = [],
    jul = [],
    ago = [],
    sep = [],
    oct = [],
    nov = [],
    dec = [];

  dates.forEach((date) => {
    let today = new Date();
    let yearToday = new Date(
      today.getFullYear() - 1,
      today.getMonth() + 1,
      today.getDate()
    );
    let day = date.date;
    if (day >= yearToday) {
      switch (day.getMonth()) {
        case 0:
          jan.push(date);
          break;
        case 1:
          feb.push(date);
          break;
        case 2:
          mar.push(date);
          break;
        case 3:
          apr.push(date);
          break;
        case 4:
          may.push(date);
          break;
        case 5:
          jun.push(date);
          break;
        case 6:
          jul.push(date);
          break;
        case 7:
          ago.push(date);
          break;
        case 8:
          sep.push(date);
          break;
        case 9:
          oct.push(date);
          break;
        case 10:
          nov.push(date);
          break;
        case 11:
          dec.push(date);
          break;
        default:
          jan.push(date);
          break;
      }
    }
  });

  yearMonths.push(jan);
  yearMonths.push(feb);
  yearMonths.push(mar);
  yearMonths.push(apr);
  yearMonths.push(may);
  yearMonths.push(jun);
  yearMonths.push(jul);
  yearMonths.push(ago);
  yearMonths.push(sep);
  yearMonths.push(oct);
  yearMonths.push(nov);
  yearMonths.push(dec);

  let months = [];

  yearMonths.forEach((month, _index) => {
    let firstDay = month[0];
    let lastDay = month[month.length - 1];

    let totalQuantity = firstDay.quantity - lastDay.quantity;

    let name, display;
    switch (_index % 12) {
      case 0:
        name = "jan";
        display = "Janeiro";
        break;
      case 1:
        name = "feb";
        display = "Fevereiro";
        break;
      case 2:
        name = "mar";
        display = "Março";
        break;
      case 3:
        name = "apr";
        display = "Abril";
        break;
      case 4:
        name = "may";
        display = "Maio";
        break;
      case 5:
        name = "jun";
        display = "Junho";
        break;
      case 6:
        name = "jul";
        display = "Julho";
        break;
      case 7:
        name = "ago";
        display = "Agosto";
        break;
      case 8:
        name = "sep";
        display = "Setembro";
        break;
      case 9:
        name = "oct";
        display = "Outubro";
        break;
      case 10:
        name = "nov";
        display = "Novembro";
        break;
      case 11:
        name = "dec";
        display = "Dezembro";
        break;
      default:
        name = "jan";
        display = "Janeiro";
        break;
    }

    let monthObj = {
      id: _index,
      name,
      display,
      quantity: totalQuantity,
    };

    months.push(monthObj);
  });

  const data = loadData(months);

  return {
    months,
    data,
  };
}

function loadData(months) {
  let labels = months.map((month) => month.display);
  let data = months.map((month) => month.quantity);

  return {
    labels,
    datasets: [
      {
        label: "Quantidade de Pessoas Mortas",
        data,
        fill: false,
        backgroundColor: "rgb(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
}

export { loadMonths };
