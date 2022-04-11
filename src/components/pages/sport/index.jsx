import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import Chart from "react-apexcharts";

const SportComponent = () => {
  const [activationData, setActivationData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [counts, setCounts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    getActivationData();
  }, []);

  useEffect(() => {
    if (activationData.length > 0) {
      const categories = activationData?.map((a) => a.data);
      setCategories(categories);
      const totalCount = activationData?.reduce((p, c) => {
        return p + c.totalCount;
      });
      setTotalCount(totalCount);
    }
  }, [activationData]);

  const getActivationData = () => {
    axios
      .get("activationData.json")
      .then((response) => {
        const data = response.data?.map(
          (a) => a.totalCount && a.totalCount.toLocaleString("en")
        );
        setCounts(data);
        setActivationData(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Axios fetch finally block");
      });
  };

  const colors = ["#3b9558", "#f6ee51", "#f3af6a", "#6a5050"];

  return (
    <div id="chart">
      {activationData.length > 0 && (
        <Card
          size="small"
          style={{
            width: "100%",
            marginTop: 5,
            marginBottom: 13,
            borderRadius: 2,
            border: "none",
          }}
          title={
            <div>
              <span
                style={{
                  fontSize: "1.025rem",
                  color: "#3a3a3a",
                  fontWeight: 600,
                }}
              >
                Daily Activation
              </span>
            </div>
          }
        >
          <Chart
            options={{
              chart: {
                height: 390,
                type: "radialBar",
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: "30%",
                    background: "transparent",
                    image: undefined,
                  },

                  dataLabels: {
                    name: {
                      show: true,
                    },
                    value: {
                      show: true,
                    },
                    total: {
                      show: true,
                      label: "Total",
                      formatter: function (w) {
                        return typeof totalCount === "number"
                          ? totalCount.toLocaleString("en")
                          : totalCount;
                      },
                    },
                  },
                },
              },
              colors: colors,
              labels: categories,
              legend: {
                show: true,
                floating: true,
                fontSize: "16px",
                position: "left",
                offsetX: 25,
                offsetY: 10,
                labels: {
                  useSeriesColors: true,
                },
                markers: {
                  size: 0,
                },
                formatter: function (seriesName, opts) {
                  return (
                    seriesName +
                    ":  " +
                    opts.w.globals.series[opts.seriesIndex] +
                    "%"
                  );
                },
                itemMargin: {
                  vertical: 3,
                },
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      show: false,
                    },
                  },
                },
              ],
            }}
            series={counts}
            type="radialBar"
            height={400}
          />
        </Card>
      )}
    </div>
  );
};

export default SportComponent;
