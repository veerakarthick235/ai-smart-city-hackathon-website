import styles from './SmartCitySkyline.module.css';

export default function SmartCitySkyline() {
  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.skyline}
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skylineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Ground */}
        <rect x="0" y="190" width="1440" height="10" fill="url(#skylineGradient)" opacity="0.3" />

        {/* Building 1 - Short */}
        <rect className={styles.building} x="20" y="140" width="60" height="50" rx="2" />
        <rect className={styles.windowGlow1} x="30" y="148" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="42" y="148" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="54" y="148" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="30" y="162" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="42" y="162" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="54" y="162" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="30" y="176" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="54" y="176" width="6" height="8" rx="1" />

        {/* Building 2 - Tall */}
        <rect className={styles.buildingFloat1} x="100" y="70" width="50" height="120" rx="2" />
        <rect className={styles.windowGlow2} x="108" y="80" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="120" y="80" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="132" y="80" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="108" y="95" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="120" y="95" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="132" y="95" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="108" y="110" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="120" y="110" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="132" y="110" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="108" y="125" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="120" y="125" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="132" y="125" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="108" y="140" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="120" y="140" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="132" y="140" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="108" y="155" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="120" y="155" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="132" y="155" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="108" y="170" width="5" height="7" rx="1" />

        {/* Building 3 - Medium */}
        <rect className={styles.building} x="170" y="110" width="70" height="80" rx="2" />
        <rect className={styles.windowGlow3} x="180" y="118" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="194" y="118" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="208" y="118" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="222" y="118" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="180" y="134" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="194" y="134" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="208" y="134" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="222" y="134" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="180" y="150" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="194" y="150" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="208" y="150" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="222" y="150" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="180" y="166" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="222" y="166" width="6" height="8" rx="1" />

        {/* Communication Tower 1 */}
        <rect className={styles.tower} x="275" y="50" width="4" height="140" />
        <rect className={styles.tower} x="268" y="90" width="18" height="3" />
        <rect className={styles.tower} x="270" y="70" width="14" height="3" />
        <circle className={styles.signal} cx="277" cy="48" r="8" />
        <circle className={styles.signalDelayed} cx="277" cy="48" r="8" />
        <circle className={styles.signalDelayed2} cx="277" cy="48" r="8" />

        {/* Building 4 - Skyscraper */}
        <rect className={styles.buildingFloat2} x="320" y="40" width="45" height="150" rx="2" />
        <rect className={styles.windowGlow1} x="328" y="50" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="340" y="50" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="352" y="50" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="328" y="65" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="340" y="65" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="352" y="65" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="328" y="80" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="340" y="80" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="352" y="80" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="328" y="95" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="340" y="95" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="352" y="95" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="328" y="110" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="340" y="110" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="352" y="110" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="328" y="125" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="340" y="125" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="352" y="125" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="328" y="140" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="340" y="140" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="352" y="140" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="328" y="155" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="340" y="155" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="352" y="155" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="328" y="170" width="5" height="7" rx="1" />

        {/* Building 5 - Wide */}
        <rect className={styles.building} x="390" y="130" width="80" height="60" rx="2" />
        <rect className={styles.windowGlow2} x="400" y="138" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="414" y="138" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="428" y="138" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="442" y="138" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="456" y="138" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="400" y="154" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="414" y="154" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="428" y="154" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="442" y="154" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="456" y="154" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="400" y="170" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="428" y="170" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="456" y="170" width="6" height="8" rx="1" />

        {/* Building 6 - Tall thin */}
        <rect className={styles.buildingFloat3} x="500" y="60" width="35" height="130" rx="2" />
        <rect className={styles.windowGlow2} x="507" y="70" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="521" y="70" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="507" y="85" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="521" y="85" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="507" y="100" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="521" y="100" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="507" y="115" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="521" y="115" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="507" y="130" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="521" y="130" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="507" y="145" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="521" y="145" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="507" y="160" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="521" y="160" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="507" y="175" width="5" height="7" rx="1" />

        {/* Building 7 - Medium */}
        <rect className={styles.building} x="560" y="100" width="55" height="90" rx="2" />
        <rect className={styles.windowGlow3} x="568" y="108" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="580" y="108" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="592" y="108" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="604" y="108" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="568" y="123" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="580" y="123" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="592" y="123" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="604" y="123" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="568" y="138" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="580" y="138" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="592" y="138" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="604" y="138" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="568" y="153" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="580" y="153" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="592" y="153" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="604" y="153" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="568" y="168" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="592" y="168" width="5" height="7" rx="1" />

        {/* Communication Tower 2 */}
        <rect className={styles.tower} x="648" y="55" width="4" height="135" />
        <rect className={styles.tower} x="641" y="85" width="18" height="3" />
        <rect className={styles.tower} x="643" y="65" width="14" height="3" />
        <circle className={styles.signal} cx="650" cy="53" r="8" />
        <circle className={styles.signalDelayed} cx="650" cy="53" r="8" />
        <circle className={styles.signalDelayed2} cx="650" cy="53" r="8" />

        {/* Building 8 - Short wide */}
        <rect className={styles.building} x="680" y="145" width="70" height="45" rx="2" />
        <rect className={styles.windowGlow1} x="690" y="152" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="704" y="152" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="718" y="152" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="732" y="152" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="690" y="168" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="704" y="168" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="718" y="168" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="732" y="168" width="6" height="8" rx="1" />

        {/* Building 9 - Tallest */}
        <rect className={styles.buildingFloat1} x="775" y="30" width="50" height="160" rx="2" />
        <rect className={styles.windowGlow4} x="783" y="40" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="795" y="40" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="807" y="40" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="783" y="55" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="795" y="55" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="807" y="55" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="783" y="70" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="795" y="70" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="807" y="70" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="783" y="85" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="795" y="85" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="807" y="85" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="783" y="100" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="795" y="100" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="807" y="100" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="783" y="115" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="795" y="115" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="807" y="115" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="783" y="130" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="795" y="130" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="807" y="130" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="783" y="145" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="795" y="145" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="807" y="145" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="783" y="160" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="795" y="160" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="807" y="160" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="783" y="175" width="5" height="7" rx="1" />

        {/* Building 10 - Medium */}
        <rect className={styles.building} x="850" y="105" width="60" height="85" rx="2" />
        <rect className={styles.windowGlow1} x="860" y="113" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="874" y="113" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="888" y="113" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="860" y="129" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="874" y="129" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="888" y="129" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="860" y="145" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="874" y="145" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="888" y="145" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="860" y="161" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="874" y="161" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="888" y="161" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="860" y="177" width="6" height="8" rx="1" />

        {/* Building 11 - Tall */}
        <rect className={styles.buildingFloat2} x="935" y="55" width="45" height="135" rx="2" />
        <rect className={styles.windowGlow2} x="943" y="65" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="955" y="65" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="967" y="65" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="943" y="80" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="955" y="80" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="967" y="80" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="943" y="95" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="955" y="95" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="967" y="95" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="943" y="110" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="955" y="110" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="967" y="110" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="943" y="125" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="955" y="125" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="967" y="125" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="943" y="140" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="955" y="140" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="967" y="140" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="943" y="155" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="955" y="155" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="967" y="155" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="943" y="170" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="967" y="170" width="5" height="7" rx="1" />

        {/* Building 12 - Short */}
        <rect className={styles.building} x="1005" y="140" width="65" height="50" rx="2" />
        <rect className={styles.windowGlow2} x="1015" y="148" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="1029" y="148" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="1043" y="148" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="1057" y="148" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="1015" y="164" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="1029" y="164" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="1043" y="164" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="1057" y="164" width="6" height="8" rx="1" />

        {/* Communication Tower 3 */}
        <rect className={styles.tower} x="1098" y="45" width="4" height="145" />
        <rect className={styles.tower} x="1091" y="85" width="18" height="3" />
        <rect className={styles.tower} x="1093" y="60" width="14" height="3" />
        <circle className={styles.signal} cx="1100" cy="43" r="8" />
        <circle className={styles.signalDelayed} cx="1100" cy="43" r="8" />
        <circle className={styles.signalDelayed2} cx="1100" cy="43" r="8" />

        {/* Building 13 - Tall */}
        <rect className={styles.buildingFloat3} x="1130" y="65" width="50" height="125" rx="2" />
        <rect className={styles.windowGlow1} x="1138" y="75" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="1150" y="75" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="1162" y="75" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="1138" y="90" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="1150" y="90" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="1162" y="90" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="1138" y="105" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="1150" y="105" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="1162" y="105" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="1138" y="120" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="1150" y="120" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="1162" y="120" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="1138" y="135" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="1150" y="135" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="1162" y="135" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="1138" y="150" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="1150" y="150" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="1162" y="150" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="1138" y="165" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="1150" y="165" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="1162" y="165" width="5" height="7" rx="1" />

        {/* Building 14 - Medium wide */}
        <rect className={styles.building} x="1200" y="115" width="75" height="75" rx="2" />
        <rect className={styles.windowGlow2} x="1210" y="123" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="1224" y="123" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="1238" y="123" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="1252" y="123" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="1210" y="139" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="1224" y="139" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="1238" y="139" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="1252" y="139" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="1210" y="155" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="1224" y="155" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="1238" y="155" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow3} x="1252" y="155" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="1210" y="171" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="1238" y="171" width="6" height="8" rx="1" />

        {/* Building 15 - Short end */}
        <rect className={styles.building} x="1300" y="150" width="55" height="40" rx="2" />
        <rect className={styles.windowGlow3} x="1310" y="157" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow1} x="1324" y="157" width="6" height="8" rx="1" />
        <rect className={styles.windowPurple} x="1338" y="157" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow5} x="1310" y="173" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow4} x="1324" y="173" width="6" height="8" rx="1" />
        <rect className={styles.windowGlow2} x="1338" y="173" width="6" height="8" rx="1" />

        {/* Building 16 - End cap */}
        <rect className={styles.buildingFloat1} x="1375" y="120" width="45" height="70" rx="2" />
        <rect className={styles.windowGlow1} x="1383" y="128" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="1395" y="128" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="1407" y="128" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="1383" y="143" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="1395" y="143" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="1407" y="143" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow1} x="1383" y="158" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow3} x="1395" y="158" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow4} x="1407" y="158" width="5" height="7" rx="1" />
        <rect className={styles.windowPurple} x="1383" y="173" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow2} x="1395" y="173" width="5" height="7" rx="1" />
        <rect className={styles.windowGlow5} x="1407" y="173" width="5" height="7" rx="1" />
      </svg>
    </div>
  );
}
