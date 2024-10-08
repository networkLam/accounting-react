import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NavBar } from "antd-mobile";
import _ from "lodash";
import dayjs from "dayjs";
import YearDetails from "./YearDetail";
import "./index.scss"
const Year = () => {
  const billList = useSelector((state) => state.Bill.billList);
  const yearData = useMemo(() => {
    // 对数据分组 按年
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY"));
  }, [billList]);
  // 展示年度的信息，以年为单位分隔，然后每点开一年就会展示每个月的消费情况
  // 得到年份的key
  const Year = useMemo(() => {
    // 降序排序
    return _.orderBy(Object.keys(yearData), [], ["desc"]);
  }, [yearData]);
  //
  const truth_arr = useMemo(() => {
    const temp_arr = [];
    Year.forEach((item) => {
      // 根据当前的年份按月分组 返回值是一个对象
      const month = _.groupBy(yearData[item], (item) =>
        dayjs(item.date).format("YYYY-MM")
      );
      // 取出了年月的KEY
      for (const item in month) {
        const obj = {
          month_log: "",
          pay: 0,
          income: 0,
          surplus: 0,
        };
        obj.month_log = item;
        // 统计当前月份的收入和支出
        obj.income = month[item]
          .filter((item) => item.type === "income")
          .reduce((a, c) => a + c.money, 0);
        obj.pay = month[item]
          .filter((item) => item.type === "pay")
          .reduce((a, c) => a + c.money, 0);
        obj.surplus = obj.income + obj.pay;
        temp_arr.push(obj);
      }
    });

    //  排序 按时间 升序排序
    const temp_order = _.orderBy(temp_arr, ["month_log"], ["desc"]);
    //对排序好的数组再分组
    const again_group = _.groupBy(temp_order, (item) =>
      dayjs(item.month_log).format("YYYY")
    );
    return again_group;
  }, [Year, yearData]);

  return (
    <div className="year-wrapper">
      <div style={{position:"fixed",width:"100%",top:0,}}>
        <NavBar className="nav" backIcon={false}>年度收支</NavBar>
        <div className="test">
          {Year.map((year) => {
            return (
              <div key={year}>
                <YearDetails year={year} MonthDetail={truth_arr[year]} />
              </div>
            );
          })}
        </div>
          
      </div>
    </div>
  );
};
export default Year;
