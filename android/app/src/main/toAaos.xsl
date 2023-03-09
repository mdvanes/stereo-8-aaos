<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" encoding="UTF-8" omit-xml-declaration="no"/>

    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>

    <!-- remove the intent-filter that is not allowed on AAOS: MAIN & LAUNCHER -->
    <xsl:template match="/manifest/application/activity/intent-filter[1]">
        <xsl:text disable-output-escaping="yes">&lt;!--</xsl:text>
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
        <xsl:text disable-output-escaping="yes">--&gt;</xsl:text>
    </xsl:template>

</xsl:stylesheet> 